import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { EmailIndex } from './pages/EmailIndex'
import { EmailCompose } from './cmps/EmailCompose'

export function App() {
    return (
        <Router>
            <section className='main-app'>
                <Routes>
                    <Route path="/" element={<EmailIndex />} >
                        <Route path={`/:mailStatus`} >
                            <Route path={`/:mailStatus/:emailId`}></Route>
                            <Route path={`/:mailStatus/compose`} element={<EmailCompose />}></Route>
                        </Route>
                    </Route>
                </Routes>
            </section>
        </Router>
    )
}

