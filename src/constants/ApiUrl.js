let apiEndPoint = 'http://api.successhub.us/';
if (process.env.NODE_ENV === 'production') {
  apiEndPoint = 'http://api.successhub.us/';
}
export const API_END_POINT = apiEndPoint;

export const GET_STAFFS = 'student/get_staffs';

export const GET_STUDENTS = 'student/get_students';

export const GET_FLAG_CATEGORIES = 'student/flag_category';

export const CREATE_NEW_FLAG = 'student/flag/create';

export const UPLOAD_IMAGES = 'resource/upload/images';
