// Group moods by week and calculate stats
export const getThisWeeksMoodStats = (moods) => {
    const thisWeek = [];
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  
    moods.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (entryDate >= startOfWeek) {
        thisWeek.push(entry);
      }
    });
  
    const stats = {};
    thisWeek.forEach(entry => {
      stats[entry.mood] = (stats[entry.mood] || 0) + 1;
    });
  
    return stats;
  };
  
  // Mood streak (days in a row user submitted mood)
  export const getMoodStreak = (moods) => {
    const dates = moods.map(m => new Date(m.date)).sort((a, b) => b - a);
    let streak = 0;
  
    for (let i = 0; i < dates.length; i++) {
      const current = dates[i];
      const expected = new Date();
      expected.setDate(expected.getDate() - i);
  
      if (
        current.toDateString() === expected.toDateString()
      ) {
        streak++;
      } else {
        break;
      }
    }
  
    return streak;
  };
  