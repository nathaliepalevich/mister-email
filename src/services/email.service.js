import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const loggedinUser = {
    email: 'nathaliepalevich@gmail.com',
    fullname: 'Mahatma Appsus'
}

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    filterBy,
    getDefaultFilter
}

const STORAGE_KEY = 'EMAILS'

_createEmails()

async function query(query) {
    let emails = await storageService.query(STORAGE_KEY)
    if (query) {
        let { searchStr, mail, status } = query
        mail = mail || ''
        searchStr = searchStr || ''
        status = status || ''
        emails = filterBy(emails, mail, status)
        emails = emails?.filter(email => email.subject.toLowerCase().includes(searchStr.toLowerCase()))
    }
    return emails
}

async function getById(id) {
    const email = await storageService.get(STORAGE_KEY, id)
    email.isRead = true
    save(email)
    return email
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(subject = '', body = '', isRead = false, isStarred = false, sentAt = 0, removedAt = null, from = 'nathaliepalevich@gmail.com', to = '') {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'nathaliepalevich@gmail.com'
            },
            {
                id: 'e102',
                subject: 'Weekly Report',
                body: 'Attached is the weekly report for your review.',
                isRead: true,
                isStarred: true,
                sentAt: 1645762800000, // February 24, 2022 12:00:00 UTC
                removedAt: null,
                from: 'reports@company.com',
                to: 'nathaliepalevich@gmail.com'
            },
            {
                id: 'e103',
                subject: 'Invitation to Webinar',
                body: 'You are invited to attend our upcoming webinar on the latest industry trends.',
                isRead: true,
                isStarred: false,
                sentAt: 1645686400000, // February 23, 2022 12:00:00 UTC
                removedAt: null,
                from: 'nathaliepalevich@gmail.com',
                to: 'subscribers@company.com'
            },
            {
                id: 'e104',
                subject: 'Job Interview Confirmation',
                body: 'This email confirms your upcoming job interview scheduled for next week.',
                isRead: true,
                isStarred: false,
                sentAt: 1645616400000, // February 22, 2022 12:00:00 UTC
                removedAt: null,
                from: 'nathaliepalevich@gmail.com',
                to: 'applicant@company.com'
            },
            {
                id: 'e105',
                subject: 'Urgent: Payment Reminder',
                body: 'This is a reminder to settle your outstanding payment by the end of the week.',
                isRead: false,
                isStarred: true,
                sentAt: 1645530000000, // February 21, 2022 12:00:00 UTC
                removedAt: null,
                from: 'billing@company.com',
                to: 'nathaliepalevich@gmail.com'
            },
            {
                id: 'e106',
                subject: 'Project Update',
                body: 'Attached is the latest update on the project status.',
                isRead: true,
                isStarred: false,
                sentAt: 1645443600000, // February 20, 2022 12:00:00 UTC
                removedAt: null,
                from: 'project@company.com',
                to: 'nathaliepalevich@gmail.com'
            },
            {
                id: 'e107',
                subject: 'Congratulations on Your Promotion!',
                body: 'We are pleased to inform you that you have been promoted to the next level.',
                isRead: false,
                isStarred: false,
                sentAt: 1645357200000, // February 19, 2022 12:00:00 UTC
                removedAt: null,
                from: 'manager@company.com',
                to: 'nathaliepalevich@gmail.com'
            },
            {
                id: 'e108',
                subject: 'New Product Launch',
                body: 'Introducing our latest product with advanced features.',
                isRead: true,
                isStarred: true,
                sentAt: 1645270800000, // February 18, 2022 12:00:00 UTC
                removedAt: null,
                from: 'marketing@company.com',
                to: 'nathaliepalevich@gmail.com'
            },
            {
                id: 'e109',
                subject: 'Reminder: Team Meeting Tomorrow',
                body: 'Just a friendly reminder about our team meeting scheduled for tomorrow.',
                isRead: true,
                isStarred: false,
                sentAt: 1645184400000, // February 17, 2022 12:00:00 UTC
                removedAt: null,
                from: 'nathaliepalevich@gmail.com',
                to: 'team@company.com'
            },
            {
                id: 'e110',
                subject: 'Vacation Request Approved',
                body: 'Your vacation request has been approved. Enjoy your time off!',
                isRead: true,
                isStarred: false,
                sentAt: 1645098000000, // February 16, 2022 12:00:00 UTC
                removedAt: null,
                from: 'nathaliepalevich@gmail.com',
                to: 'employee@company.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getDefaultFilter(route) {
    route = route.includes('/') ? route.substring(1) : route
    return {
        searchStr: '',
        mail: route
    }
}

function filterBy(emails, by, status) {
    let filterByStatus
    switch (status) {
        case 'read':
            filterByStatus = emails.filter(email => email.isRead)
            break;
        case 'unread':
            filterByStatus = emails.filter(email => !email.isRead)
            break
        default:
            filterByStatus = emails
    }
    switch (by) {
        case 'inbox':
            return filterByStatus.filter(email => email.to === loggedinUser.email)
        case 'sent':
            return filterByStatus.filter(email => email.from === loggedinUser.email)
        case 'starred':
            return filterByStatus.filter(email => email.isStarred)
        case 'drafts':
            return filterByStatus.filter(email => !email.sentAt)
        case 'trash':
            return filterByStatus.filter(email => email.removedAt)
    }
}

