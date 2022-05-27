const mongoose = require('mongoose');
const Event = require('../models/EventModel')

exports.createEvent = async (req, res) => {
    const event = new Event({
        title: req.body.title,
        content: req.body.content,
        city: req.body.city,
        country: req.body.country,
        start: req.body.start,
        end: req.body.end,
    });
    return event
        .save()
        .then((newEvent) => {
            return res.redirect("/event")
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}
exports.getAllEvent = async (req, res) =>{
                               /* Event.find()
    .select('_id title content city country start end')
    .then((allEvent) => {
        return res.status(200).render("events.ejs", {event: res.event})
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });*/
    try {
        const event = await Event.find();
        //res.status(200).json(event);
        res.status(200).render('events', {event: event})
    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    }
}

exports.updateEvent = async (req, res) => {
    const id = req.params.eventId;
    const updateObject = req.body;
    Event.updateOne({ _id:id }, { $set:updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Cause is updated',
                updateEvent: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}
exports.deleteEvent = async (req, res) => {
    const id = req.params.eventId;
    Event.findByIdAndRemove(id)
        .exec()
        .then(()=> res.status(204).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
        }));
}
