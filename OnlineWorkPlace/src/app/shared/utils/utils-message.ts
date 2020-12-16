import {SetPopUpMessage} from '../../store/message-pop-up';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';

export class UtilsMessage {
  static MESSAGE_STATUS_ERROR = 'error-message';
  static MESSAGE_STATUS_NEUTRAL = 'neutral-message';
  static MESSAGE_STATUS_POSITIVE = 'positive-message';

  static MESSAGE_LOGGED_IN = 'Successfully logged in';
  private static MESSAGE_SUCCESSFULLY = 'was successfully created';
  static MESSAGE_WORKPLACE_CREATED = `Workplace ${UtilsMessage.MESSAGE_SUCCESSFULLY}`;

  @Dispatch()
  static showMessage(message: string, status: string, description?: string): SetPopUpMessage {
    return new SetPopUpMessage({title: message, status, content: description});
  }
}
