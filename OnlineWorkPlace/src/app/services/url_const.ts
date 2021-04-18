export const SERVER_URL = 'api/';
export const SERVER_ORIGIN_URL = 'http://localhost:8080';

////////////////////// WORKPLACE API //////////////////////
export const LOGIN = 'login';
export const REGISTER = 'register';
export const USER_PHOTO = SERVER_ORIGIN_URL + '/api/photo/';
export const GET_WORKPLACE_RIGHTS = 'rights';
export const CHANGE_EMAIL = 'change-email/user/';
export const CHANGE_PASS = 'change-password/user/';
export const ADD_PHOTO = 'user-photo/';

////////////////////// WORKPLACE API //////////////////////
export const GET_ALL_WORKPLACES = 'workplaces';
export const ADD_WORKPLACE = 'workplace';
export const WORKPLACE_PHOTO = SERVER_ORIGIN_URL + '/api/photo/';
export const ADD_WORKPLACE_PHOTO = 'workplace-photo/';
export const GET_WORKPLACE_USERS = 'users';
export const GET_WORKPLACE_LABELS = 'labels';
export const ADD_WORKPLACE_USER = 'user';
export const ADD_WORKPLACE_LABEL = 'label';
export const FIND_USERS_BY_EMAIL = 'users';
export const DELETE_WORKPLACE_USER = 'user/';
export const DELETE_WORKPLACE_LABEL = 'label/';

////////////////////// WORKPLACE ELEMENTS API //////////////////////
export const GET_ELEMENTS = 'elements';
export const ADD_ELEMENT = 'element';
export const ARCHIVE_ELEMENT = 'archive-element';

////////////////////// STORAGE API //////////////////////
export const GET_ALL_FILES = 'workplace-storage';
export const ADD_FILE = '';
export const REMOVE_FILE = '';
export const DOWNLOAD_FILE = '';

////////////////////// NOTIFICATION API //////////////////////
export const SET_NOTIFICATIONS_STREAM = 'sse/notification/user/';
export const GET_ALL_NOTIFICATIONS = 'notifications/user/';

////////////////////// WEBSOCKET API //////////////////////
export const SET_SOCKET_URL = 'ws://localhost:8080/api/socket';
export const GET_NEW_MESSAGE = '/message/thread';
export const SEND_NEW_MESSAGE = '/chat/message';
export const GET_TYPING_NOTIFICATION = '/message/notify/thread';
export const SEND_NOTIFY_TYPING_MESSAGE = '/chat/notify';
export const GET_OLD_MESSAGES = '/thread/';
