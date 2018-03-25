// import test from 'ava'
import CoachClass, { toInt } from '../lib/coach'
import moment from 'moment'

const getTime = (seconds) => {
  let startDate = moment('2016-02-08 09:30:00')
  return startDate.add(seconds, 'seconds')
}

test('recordRound', () => {
  let coach = new CoachClass()
  coach.start(getTime(0))

  coach.recordRound(getTime(80))
  coach.recordRound(getTime(100))

  expect(coach.roundCount()).toEqual(2)
  expect(coach.average()).toEqual(50)
})

test('reset', () => {
  let coach = new CoachClass()

  coach.start()
  coach.recordRound()
  coach.reset()

  expect(coach.roundCount()).toEqual(0)
})

test('with no goal set, the goal is the average and knows remaining time', () => {
  let currentTimeFunc = () => getTime(210)
  let coach = new CoachClass({currentTimeFunc})
  coach.start(getTime(0))
  coach.recordRound(getTime(100))
  coach.recordRound(getTime(200))

  expect(coach.roundGoal()).toEqual(100)
  expect(coach.nextGoal()).toEqual(toInt(getTime(300)))

  expect(coach.remainingTime()).toEqual(90)
})

test('with a goal set remaining time is set to correct goal', () => {
  let currentTimeFunc = () => getTime(110)

  let goal = 3
  let minutes = 12
  let seconds = minutes * 60
  let coach = new CoachClass({ currentTimeFunc, goal, minutes })

  coach.start(getTime(0))

  let expectedRoundGoal = seconds / goal

  expect(coach.roundGoal()).toEqual(expectedRoundGoal)

  const round1Time = 100
  coach.recordRound(getTime(round1Time))

  let remainingRounds = 2
  expectedRoundGoal = (seconds - round1Time) / remainingRounds

  expect(coach.roundGoal()).toEqual(expectedRoundGoal)
})

test("given a goal and a time", () => {
  let currentTimeFunc = () => getTime(110)
  let goal = 10
  let minutes = 10

  let coach = new CoachClass({ currentTimeFunc, goal, minutes })
  expect(coach.roundGoal()).toEqual(60)

  coach.start(getTime(0))

  coach.recordRound(getTime(111))
  coach.recordRound(getTime(112))
  coach.recordRound(getTime(113))
  coach.recordRound(getTime(114))
  coach.recordRound(getTime(60 * 9))

  expect(coach.roundGoal()).toEqual(12)

  // reverts back to average after hitting goal.
  coach.recordRound(getTime(111))
  coach.recordRound(getTime(112))
  coach.recordRound(getTime(113))
  coach.recordRound(getTime(114))
  coach.recordRound(getTime(60 * 9))

  const expected = (60*9)/10

  expect(coach.roundGoal()).toEqual(expected)
  expect(coach.roundCount()).toEqual(10)
})
