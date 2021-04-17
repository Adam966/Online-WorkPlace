import {SetPopUpMessage} from '../../store/message-pop-up';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';

export class UtilsMessage {
  static MESSAGE_STATUS_ERROR = 'error-message';
  static MESSAGE_STATUS_NEUTRAL = 'neutral-message';
  static MESSAGE_STATUS_POSITIVE = 'positive-message';

  static MESSAGE_LOGGED_IN = 'Successfully logged in.';
  static MESSAGE_REGISTERED_IN = 'Successfully registered.';
  private static MESSAGE_SUCCESSFULLY = 'was successfully created.';
  private static MESSAGE_REMOVED = 'was successfully removed.';
  static MESSAGE_WORKPLACE_CREATED = `Workplace ${UtilsMessage.MESSAGE_SUCCESSFULLY}`;
  static MESSAGE_UNEXPECTED_ERROR = 'Something weird going on here.';
  static MESSAGE_LABEL_CREATED =  `Label ${UtilsMessage.MESSAGE_SUCCESSFULLY}`;
  static MESSAGE_USER_ADDED =  `User was successfully added.`;
  static MESSAGE_LABEL_REMOVED =  `Label ${UtilsMessage.MESSAGE_REMOVED}`;
  static MESSAGE_USER_REMOVED =  `User ${UtilsMessage.MESSAGE_REMOVED}`;
  static NEW_NOTIFICATION = 'You have new notification';
  static EMAIL_CHANGED_SUCCESSFULLY = 'Email was successfully changed';


  @Dispatch()
  static showMessage(message: string, status: string, description?: string): SetPopUpMessage {
    return new SetPopUpMessage({title: message, status, content: description});
  }
}

