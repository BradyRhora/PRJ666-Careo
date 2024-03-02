import Link from 'next/link'
import Image from 'next/image'

import { useAtomValue } from "jotai";
import { userAtom } from "@/store";

export default function Header() {
    const userData = useAtomValue(userAtom);
        
    return (
        <div id="header">
            <Link href="/"><Image width="32" height="32" src="/assets/careo-temp-logo.png" alt="Careo Logo"></Image></Link>
            {userData && userData.email ? <span>Welcome, <b>{userData.email.split('@')[0]}</b> <Link style={{fontSize: '0.8em'}} href="/api/logout">Logout</Link></span> : null}
        </div>
    )
}