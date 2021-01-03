import mongoose from 'mongoose'

const RoutineSchema = mongoose.Schema({
    routine: {
        type: String
    },
    yourName: {
        type: String,
        required: true
    },
    routineName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
})

export default mongoose.model('Routine', RoutineSchema)