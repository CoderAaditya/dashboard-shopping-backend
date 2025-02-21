const Domain = require('../models/Domain');

const checkDomainAvailability = async (req, res) => {
    const { domain } = req.body;
    try {
        const existingDomain = await Domain.find({ name: domain.toLowerCase() });
        if(existingDomain.length === 0) {
            return res.status(200).send({ data: false });
        }else{
            return res.status(200).send({ data: true });
        }
    } catch (error) {
        res.status(400).send({ message: 'Something Went Wrong', status: 400 });
    }
};

const addDomain = async (req, res) => {
    const { domain } = req.body;
    const lowerCaseDomain = domain.toLowerCase();

    try {
        const existingDomain = await Domain.findOne({ name: lowerCaseDomain });
        if (existingDomain) {
            return res.status(400).json({ message: 'Domain already exists' });
        }

        const newDomain = new Domain({ name: lowerCaseDomain });
        await newDomain.save();
        res.status(201).send({ message: 'Domain added', domain: lowerCaseDomain, status: 200 });
    } catch (error) {
        res.status(400).send({ message: 'Something Went Wrong', status: 400 });
    }
};

const getAllDomains = async (req, res) => {
    try {
        const domains = await Domain.find().lean();
        if (domains.length === 0) {
            return res.status(200).send({ message: 'No domains found', domains: [] });
        }
        res.status(200).send({ message: 'Success', domains });
    } catch (error) {
        res.status(400).send({ message: 'Something Went Wrong', status: 400 });
    }
};

const deleteDomain = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await Domain.deleteOne({ name: domain.toLowerCase() });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Domain not found' });
        }
        res.send({ message: 'Domain deleted' });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({ message: 'Something Went Wrong', status: 400 });
    }
};

const updateDomain = async (req, res) => {
    const { oldDomain, newDomain } = req.body;
    const lowerCaseDomain = newDomain.toLowerCase();

    try {
        const existingDomain = await Domain.findOne({ name: lowerCaseDomain });
        if (existingDomain) {
            return res.status(400).json({ message: 'Domain already exists' });
        }

        const result = await Domain.updateOne(
            { name: oldDomain.toLowerCase() },
            { name: lowerCaseDomain }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'Domain not found' });
        }

        res.status(200).send({ message: 'Domain updated', domain: lowerCaseDomain });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({ message: 'Something Went Wrong', status: 400 });
    }
};

const deleteAllDomains = async (req, res) => {
    try {
        const result = await Domain.deleteMany({});
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'No domains found' });
        }
        res.send({ message: 'Domain deleted' });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({ message: 'Something Went Wrong', status: 400 });
    }
};

module.exports = {
    checkDomainAvailability,
    addDomain,
    getAllDomains,
    deleteDomain,
    updateDomain,
    deleteAllDomains
};
