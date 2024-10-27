import statements from "../models/Statements.js"; // this is your MongoDB model

const addStatement = async (req, res) => {
    try {
        const newStatement = await statements.create({
            user_id: req.body.user_id,
            name: req.body.name,
            category: req.body.category,
            type: req.body.type,
            amount: req.body.amount,
            date: req.body.date
        });

        return res.status(200).json(newStatement);
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getStatementsFromUser = async (req, res) => {
    try {
        const userStatements = await statements.find({ user_id: req.params.user_id });
        return res.status(200).json(userStatements);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getStatementsFromUserAndType = async (req, res) => {
    try {
        const filteredStatements = await statements.find({ user_id: req.params.user_id, type: req.params.type });
        return res.status(200).json(filteredStatements);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateStatement = async (req, res) => {
    try {
        await statements.findOneAndUpdate(
            { _id: req.params.id },
            {
                name: req.body.name,
                category: req.body.category,
                type: req.body.type,
                amount: req.body.amount,
                date: req.body.date
            }
        );

        const updatedStatement = await statements.findById(req.params.id);
        return res.status(200).json(updatedStatement);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteStatement = async (req, res) => {
    try {
        const deletedStatement = await statements.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletedStatement);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export default { addStatement, getStatementsFromUser, getStatementsFromUserAndType, updateStatement, deleteStatement };