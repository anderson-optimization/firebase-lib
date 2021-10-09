export const namespace = {
  name: 'name-object',
  
  users: {
    userInfo: {
      path: 'users',
      
      hobbies: ['hobbies'],
      hobbiesVar: ['hobbies', '$uid']
    },
    
    userInfoVars: ['users', '$id', '#name'],
    userInfoData: ['users', '#id', '#name'],
    userInfoGlobal: ['users', '$uid', '#name'],
    // for coverage: should add resourceDefinition to index only once
    userInfoVarsDouble: ['users', '$id', 'name', '$id']
  },
  
  
  colors: {
    colorInfo: 'colors'
  },
  
  removals: 'removals',
  
  bands: 'bands',
  
  states: 'states'
};
