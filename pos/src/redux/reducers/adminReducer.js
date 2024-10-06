import {UPDATE_ADMIN_SUCCESS,UPDATE_ADMIN_REQUEST,UPDATE_ADMIN_FAIL,DELETE_ADMIN_SUCCESS,DELETE_ADMIN_FAIL,DELETE_ADMIN_REQUEST,GET_ADMIN_SUCCESS,GET_ADMIN_REQUEST,GET_ADMIN_FAIL,GET_ADMINS_SUCCESS,GET_ADMINS_REQUEST,GET_ADMINS_FAIL,ADMIN_LOGIN_FAIL,ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGOUT_SUCCESS,ADMIN_REGISTER_FAIL,ADMIN_REGISTER_REQUEST,ADMIN_REGISTER_SUCCESS} from "../constants/admin"

function adminRegisterReducer(state = {}, action) {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, data: action.payload,success:true };
    case ADMIN_REGISTER_FAIL:
    
      return { loading: false, error: action.payload};
    default: return state;
  }
}
function adminLoginReducer(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload,success:true };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
function getAdminsReducer(state = {}, action) {
  switch (action.type) {
    case GET_ADMINS_REQUEST:
      return { loading: true };
    case GET_ADMINS_SUCCESS:
      return { loading: false, data: action.payload,success:true };
    case GET_ADMINS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
function getAdminReducer(state = {}, action) {
  switch (action.type) {
    case GET_ADMIN_REQUEST:
      return { loading: true };
    case GET_ADMIN_SUCCESS:
      return { loading: false, data: action.payload,success:true };
    case GET_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function deleteAdminReducer(state = {}, action) {
  switch (action.type) {
    case DELETE_ADMIN_REQUEST:
      return { loading: true };
    case DELETE_ADMIN_SUCCESS:
      return { loading: false, data: action.payload,success:true };
    case DELETE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
function updateAdminReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ADMIN_REQUEST:
      return { loading: true };
    case UPDATE_ADMIN_SUCCESS:
      return { loading: false, data: action.payload,success:true };
    case UPDATE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
export {
    adminRegisterReducer,adminLoginReducer,getAdminReducer,getAdminsReducer,deleteAdminReducer,updateAdminReducer
}