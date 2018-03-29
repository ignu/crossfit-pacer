import React from "react";
import { View, Text } from "react-native";
import {GiftedForm} from 'react-native-gifted-form'
import {observer, inject} from "mobx-react";

@inject("coach")
@inject("settings")
export default class Settings extends React.Component {
  render() {
    const { coach, settings } = this.props
    alert(coach)

    return (
        <GiftedForm formName='signupForm'>
          <Text> Cool</Text>

          <GiftedForm.SeparatorWidget />

          <GiftedForm.TextInputWidget
            name='goal'
            title='Goal'
            placeholder='18'
            clearButtonMode='while-editing'
            value={coach.goal}
            onTextInputBlur={(v) => coach.goal = v}
          />

          <GiftedForm.TextInputWidget
            name='minutes'
            title='Minutes'
            placeholder='20'
            clearButtonMode='while-editing'
            value={coach.minutes}
            onTextInputBlur={(v) => coach.minutes = v}
          />

          <GiftedForm.NoticeWidget
            title="The progress bar will update to keep you on track to this goal. Leave these blank to set the round's goal based on your current average."
          />

          <GiftedForm.SeparatorWidget />

          <GiftedForm.SwitchWidget
            name='showTimer'
            title='Show Timer'
            value={settings.showTimer}
            onChange={(v) => settings.showTimer = v}
          />

          <GiftedForm.SeparatorWidget />

          <GiftedForm.SwitchWidget
            name='beepWhenDone'
            title='Beep When Done'
            value={settings.beepWhenDone}
            onChange={(v) => settings.beepWhenDone = v}
          />

        </GiftedForm>
    );
  }
}
