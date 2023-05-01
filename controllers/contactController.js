const asyncHandler = require('express-async-handler'); 
const Contact = require('../models/contactModel');



//@desc Get All Contacts
//@route GET /api/contact
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(); // this connects with the server / all server ops must be desyncronized 
    res.status(200).json(contacts);
});


//@desc Get Contact
//@route GET /api/contact/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact couldn't found");
    }
    res.status(201).json(contact);
})




//@desc Create Contact
//@route POST /api/contact
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log(`The request body is : ${req.body}`); 
    const { name, email, phone } = req.body; // structured the data that comes from body header
    if (!name || !email || !phone) {
        res.status(400); 
        throw new Error('All fields are mandatory!');
    }

    const contact = await Contact.create({
        name, 
        email, 
        phone 
    })

    res.status(201).json(contact);
})



//@desc Delete Contact
//@route DELETE /api/contact/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({msg:`Delete contact for ${req.params.id}`});
})



//@desc Update Contact
//@route PUT /api/contact/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new : true}
    )
    res.status(200).json(updatedContact);
})

 
module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};


