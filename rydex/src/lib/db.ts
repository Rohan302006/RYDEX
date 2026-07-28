// import mongoose from "mongoose"

// const mongodbUrl=process.env.MONGODB_URL

// // if(!mongodbUrl){
// //     throw new Error("db url not found!")
// // }

// const cached=global.mongooseConn
// // if(!cached){
// //     cached=global.mongooseConn={conn:null,promise:null}
// // }

// // const connectDb=async () => {
// //     if(cached.conn){
// //         return cached.conn
// //     }


// //     if(!cached.promise){
// //         cached.promise=mongoose.connect(mongodbUrl).then(c=>c.connection)
// //     }

// // try {
// //     const conn=await cached.promise
  
// //     return conn
// // } catch (error) {
// //     console.log(error)
// // }

// // }



// const connectDb = async () => {
//     if (cached.conn) {
//         return cached.conn
//     }
    
//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//             serverSelectionTimeoutMS: 8000
//         }
//         cached.promise = mongoose.connect(mongodbUrl, opts).then(c => c.connection)
//     }

//     try {
//         const conn = await cached.promise
//         cached.conn = conn
//         return conn
//     } catch (error) {
//         cached.promise = null
//         console.log("MongoDB connection error:", error)
//         throw error
//     }
// }
// export default connectDb


import mongoose from "mongoose"

const mongodbUrl = process.env.MONGODB_URL

if (!mongodbUrl) {
    throw new Error("db url not found!")
}

let cached = global.mongooseConn
if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null }
}

const connectDb = async () => {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 8000
        }
        cached.promise = mongoose.connect(mongodbUrl, opts).then(c => c.connection)
    }

    try {
        const conn = await cached.promise
        cached.conn = conn
        return conn
    } catch (error) {
        cached.promise = null
        console.log("MongoDB connection error:", error)
        throw error
    }
}
export default connectDb