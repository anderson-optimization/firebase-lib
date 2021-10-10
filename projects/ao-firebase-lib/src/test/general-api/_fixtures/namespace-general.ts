export const namespace = {
  teams: {
    path: 'teams',
    
    teamInfo: ['teams', '$tid'],
    teamConfig: ['teams', '$configId'],
    teamSetting: ['teams', '$tid', '$settingId'],
    teamProjects: ['projects', '$settingId'],
    teamNoRemovalFromIndex: ['no-global-vars']
  }
};
