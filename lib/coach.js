//@flow
import moment from 'moment'
import {observable} from 'mobx'

export const toInt = (time: moment$Moment) : number => {
  if (typeof time.utc !== "function") {
    console.error('non moment object passed to toInt >>> ', time, time.utc)
    const err = new Error();
    console.error(err.stack);
  }

  return time.utc().unix()
}

export default class Coach {
  startTime: number
  @observable goal: number
  @observable minutes: number

  _rounds: Array<number>
  _currentTimeFunc: Function

  constructor (options : Object = {}) {
    let { currentTimeFunc, goal, minutes } = options

    this._rounds = []
    this.goal = goal
    this.minutes = minutes
    this._currentTimeFunc = currentTimeFunc || moment
  }

  hasGoal() {
    return !!(this._rounds.length > 0 || this.goal)
  }

  roundCount () {
    return this._rounds.length
  }

  average () : number {
    return (this.lastRound() - this.startTime) / (this.roundCount() || 1)
  }

  elapsedSeconds () : number {
    if (!this.startTime) return 0

    let start = this.startTime

    return toInt(this._currentTimeFunc()) - start
  }

  roundGoal () {
    if (!this.goal) return this.average()

    let remainingRounds = this.goal - this._rounds.length

    if (!remainingRounds) return this.average()

    let timeInSeconds = (this.minutes * 60)
    let remainingTime = timeInSeconds - this.lastRoundSeconds()
    return remainingTime / remainingRounds
  }

  currentRoundSeconds () {
    this.elapsedSeconds() - this.lastRoundSeconds()
  }

  lastRoundSeconds () {
    if(!this._rounds.length) { return 0 }

    return this.lastRound() - this.startTime
  }

  lastRound () {
    if (!this.startTime) return 0

    if (!this._rounds.length) { return this.startTime }
    let round = this._rounds[this._rounds.length - 1]
    return round
  }

  nextGoal () {
    return this.lastRound() + this.roundGoal()
  }

  remainingTime () {
    return this.nextGoal() - this.currentTime()
  }

  reset () {
    this._rounds = []
    this.startTime = 0
  }

  startTime () {
    return this.startTime
  }

  currentTime () {
   return toInt(this._currentTimeFunc())
  }

  start (startTime:moment$Moment = moment()) {
    this.startTime = toInt(startTime)
    this._rounds = []
  }

  recordRound (roundTime:moment$Moment = moment()) {
    this._rounds.push(toInt(roundTime))
  }
}
