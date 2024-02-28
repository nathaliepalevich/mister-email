import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { EmailIndex } from './pages/EmailIndex'
export function App() {
    const mailRoutes = ['inbox', 'sent', 'starred', 'drafts', 'trash']
    return (
        <Router>
            <section className='main-app'>
                <Routes>
                    <Route path="/" element={<EmailIndex />} >
                        {mailRoutes.map((mailRoute, index) => {
                            return <Route key={index} path={`/${mailRoute}`} >
                                <Route path={`/${mailRoute}:mailId`}></Route>
                            </Route>
                        })}
                    </Route>
                </Routes>
            </section>
        </Router>
    )
}

