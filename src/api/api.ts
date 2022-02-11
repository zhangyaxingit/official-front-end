import axios from './index';

function getHome() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/home').then(resolve).catch(reject);
  });
}

function getEmploy() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/recruit').then(resolve).catch(reject);
  });
}

function setEmploy(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/recruit', params).then(resolve).catch(reject);
  });
}

function getContact() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/contact').then(resolve).catch(reject);
  });
}

function setContact(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/contact', params).then(resolve).catch(reject);
  });
}

function getAbout() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/about').then(resolve).catch(reject);
  });
}

function setAbout(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/about', params).then(resolve).catch(reject);
  });
}

function getProduct() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/productModule').then(resolve).catch(reject);
  });
}

function setProduct(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/productModule', params).then(resolve).catch(reject);
  });
}

function deleteProduct(params:any) {
  return new Promise((resolve, reject) => {
    axios.delete('api/v1/product', {data: {id: params}}).then(resolve).catch(reject);
  });
}

function addProduct( params:any ) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/product', params).then(resolve).catch(reject);
  });
}

function updateProduct( params:any ) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/product', params).then(resolve).catch(reject);
  });
}

function getSolve() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/solveModule').then(resolve).catch(reject);
  });
}

function setSolve(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/solveModule', params).then(resolve).catch(reject);
  });
}

function deleteSolve(params:any) {
  return new Promise((resolve, reject) => {
    axios.delete('api/v1/solve', {data: {id: params}}).then(resolve).catch(reject);
  });
}

function addSolve( params:any ) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/solve', params).then(resolve).catch(reject);
  });
}

function updateSolve( params:any ) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/solve', params).then(resolve).catch(reject);
  });
}

function getNews() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/newsModule').then(resolve).catch(reject);
  });
}

function setNews(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/newsModule', params).then(resolve).catch(reject);
  });
}

function deleteNews(params:any) {
  return new Promise((resolve, reject) => {
    axios.delete('api/v1/news', {data: {id: params}}).then(resolve).catch(reject);
  });
}

function addNews( params:any ) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/news', params).then(resolve).catch(reject);
  });
}

function updateNews( params:any ) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/news', params).then(resolve).catch(reject);
  });
}

function getSetting() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/setting').then(resolve).catch(reject);
  });
}

function updateSetting(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/setting', params).then(resolve).catch(reject);
  });
}

function getClassifyList(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/geoData/paging', {params}).then(resolve).catch(reject);
  });
}

function getClassifyDetail(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/geoData/get', {params}).then(resolve).catch(reject);
  });
}

function invokeApply(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/geoData/invokeApply', params).then(resolve).catch(reject);
  });
}


function getApprovalList(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/approval/paging', {params}).then(resolve).catch(reject);
  });
}

function applyApprove(params:any) {
  return new Promise((resolve, reject) => {
    axios.post(`api/v1/approval/approve?applyID=${params.applyID}`).then(resolve).catch(reject);
  });
}


function applyReject(params:any) {
  return new Promise((resolve, reject) => {
    axios.post(`api/v1/approval/reject?applyID=${params.applyID}`).then(resolve).catch(reject);
  });
}


function getStandardList(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/dataStandard/paging', {params}).then(resolve).catch(reject);
  });
}

function getStandardDetail(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/dataStandard/get', {params}).then(resolve).catch(reject);
  });
}


function deleteStandard(params:any) {
  return new Promise((resolve, reject) => {
    axios.delete(`api/v1/dataStandard/delete?id=${params.id}`).then(resolve).catch(reject);
  });
}

function modifyStandard(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/dataStandard/modify', params).then(resolve).catch(reject);
  });
}


function uploadStandard(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/dataStandard/upload', params).then(resolve).catch(reject);
  });
}


function uploadFile(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/upload', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(resolve).catch(reject);
  });
}

function uploadShareFile(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/geoData/upload', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(resolve).catch(reject);
  });
}


function getMessageList(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/message/paging', {params}).then(resolve).catch(reject);
  });
}

function readMsg(params:any) {
  return new Promise((resolve, reject) => {
    axios.post(`api/v1/message/read?id=${params.id}`).then(resolve).catch(reject);
  });
}

function login(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/user/login', params).then(resolve).catch(reject);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/user/logout').then(resolve).catch(reject);
  }); 
}



function addRole(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/role/create', params).then(resolve).catch(reject);
  });
}

function getRoleList(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/role/paging', {params}).then(resolve).catch(reject);
  });
}

function getApiList() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/api/list').then(resolve).catch(reject);
  });
}

function getBindedApis(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/role/listApiByRoleKey', {params}).then(resolve).catch(reject);
  });
}

function deleteRole(params:any) {
  return new Promise((resolve, reject) => {
    axios.delete('api/v1/role/delete', {data: params}).then(resolve).catch(reject);
  });
}

function bindApi(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/role/bindApi', params).then(resolve).catch(reject);
  });
}

function getUserList(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/user/paging', {params}).then(resolve).catch(reject);
  });
}

function addUser(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/user/register', params).then(resolve).catch(reject);
  });
}

function getMenuTree() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/menu/getTree').then(resolve).catch(reject);
  });
}


function addMenu(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/menu/create', params).then(resolve).catch(reject);
  });
}


function deleteMenu(params:any) {
  return new Promise((resolve, reject) => {
    axios.delete('api/v1/menu/delete', {data: params}).then(resolve).catch(reject);
  });
}

function updateMenu(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/menu/update', params).then(resolve).catch(reject);
  });
}

function getDeptTree() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/dept/tree').then(resolve).catch(reject);
  });
}

function addDept(params:any) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/dept/create', params).then(resolve).catch(reject);
  });
}



function deleteDept(params:any) {
  return new Promise((resolve, reject) => {
    axios.delete('api/v1/dept/delete', {data: params}).then(resolve).catch(reject);
  });
}


function updateDept(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/dept/update', params).then(resolve).catch(reject);
  });
}


function getMenuTreeByUser() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/menu/getTreeByRole').then(resolve).catch(reject);
  });
}

function getRoleMenu(params:any) {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/menu/listByRole', {params}).then(resolve).catch(reject);
  });
}

function bindMenu(params:any) {
  return new Promise((resolve, reject) => {
    axios.put('api/v1/role/bindMenu', params).then(resolve).catch(reject);
  });
}


export default {
  getHome,
  
  getContact,
  setContact,
  getAbout,
  setAbout,
  setEmploy,
  getEmploy,

  getProduct,
  setProduct,
  deleteProduct,
  addProduct,
  updateProduct,

  getSolve,
  setSolve,
  deleteSolve,
  addSolve,
  updateSolve,

  getNews,
  setNews,
  deleteNews,
  addNews,
  updateNews,
  
  getSetting,
  updateSetting,

  getClassifyList,
  getClassifyDetail,
  invokeApply,

  getApprovalList,
  applyApprove,
  applyReject,

  getStandardList,
  getStandardDetail,
  deleteStandard,
  modifyStandard,
  uploadStandard,
  uploadFile,

  uploadShareFile,

  getMessageList,
  readMsg,

  // 用户管理模块
  login,
  logout,
  addRole,
  getRoleList,
  getApiList,
  getBindedApis,
  deleteRole,
  bindApi,
  getUserList,
  addUser,
  getMenuTree,
  addMenu,
  deleteMenu,
  updateMenu,
  getDeptTree,

  addDept,
  deleteDept,
  updateDept,
  getMenuTreeByUser,
  getRoleMenu,
  bindMenu
};
