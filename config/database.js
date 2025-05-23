const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * This function attempts to connect to the primary MongoDB server first,
 * and if that fails, it falls back to the backup server
 */
const connectDB = async () => {
  const primaryServer = 'mongodb://10.12.1.202:27017/hjemmetentamen';
  const backupServer = 'mongodb://10.12.1.201:27017/hjemmetentamen';
  
  console.log(`Attempting to connect to primary MongoDB at ${primaryServer}...`);
  
  try {
    await mongoose.connect(primaryServer, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout for server selection
    });
    console.log('MongoDB connected successfully to primary server');
    return true;
  } catch (primaryErr) {
    console.error('Failed to connect to primary MongoDB server:');
    console.error(`- Error name: ${primaryErr.name}`);
    console.error(`- Error message: ${primaryErr.message}`);
    
    // Try backup server
    console.log(`Attempting to connect to backup MongoDB at ${backupServer}...`);
    try {
      await mongoose.connect(backupServer, {
        serverSelectionTimeoutMS: 5000 // 5 seconds timeout for server selection
      });
      console.log('MongoDB connected successfully to backup server');
      return true;
    } catch (backupErr) {
      console.error('Failed to connect to backup MongoDB server:');
      console.error(`- Error name: ${backupErr.name}`);
      console.error(`- Error message: ${backupErr.message}`);
      
      console.error('MongoDB connection error details:');
      console.error('Possible causes:');
      console.error('- MongoDB servers are not running at the specified addresses/ports');
      console.error('- Network connectivity issues between app and database servers');
      console.error('- Firewall blocking the connections');
      
      return false;
    }
  }
};

module.exports = connectDB;
