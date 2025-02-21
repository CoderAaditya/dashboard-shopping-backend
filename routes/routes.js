const express = require('express');
const router = express.Router();
const {
    checkDomainAvailability,
    addDomain,
    getAllDomains,
    deleteDomain,
    updateDomain,
    deleteAllDomains
} = require('../controllers/domainController');

router.post('/check', checkDomainAvailability);

router.post('/addDomain', addDomain);

router.get('/getAllDomains', getAllDomains);

router.post('/deleteDomain', deleteDomain);

router.post('/updateDomain', updateDomain);

router.get('/deleteAllDomains', deleteAllDomains);

module.exports = router;