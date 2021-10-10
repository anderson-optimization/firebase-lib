export const namespace = {
  users: {
    userInfo: {
      path: 'users-paths',
      hobbies: ['hobbies-paths'],
      hobbiesVars: ['hobbies-paths', '$uid']
    },
    
    userInfoVars: ['users-paths', '$id', '#name'],
    userInfoData: ['users-paths', '#id', '#name'],
    userInfoGlobal: ['users-paths', '$uid', '#name'],
    userInfoVarsDouble: ['users-paths', '$someId', 'name', '$someId']
  }
};
