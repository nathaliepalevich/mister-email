import { useEffect, useState } from 'react'
import { emailService } from '../services/email.service'
import { Main } from "../cmps/Main.jsx";
import { RightSide } from '../cmps/RightSide.jsx';
import { AppHeader } from '../cmps/AppHeader.jsx'
import { LeftSide } from '../cmps/LeftSide.jsx';

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        loadEmails()
    }, [])

    function filterBy(by) {
        let filtered = emailService.filterBy(by, emails)
        setEmails(filtered)
    }

    async function loadEmails() {
        try {
            const emails = await emailService.query()
            setEmails(emails)
            setError(null)
        } catch (err) {
            setError(err)
            console.log('Error in loadEmails', err)
        }
    }

    if (error) return (<div>
        <h1>Oops... Somthing went wrong</h1>
        <p>{error}</p>
    </div>)

    return (
        <div className='email-index'>
            <AppHeader />
            <LeftSide onFilterBy={filterBy} />
            <Main emails={emails} />
            <RightSide />
        </div>
    )
}