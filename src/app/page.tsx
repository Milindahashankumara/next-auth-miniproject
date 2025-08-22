import Link from 'next/link';
import DoubleNavbar from "@/components/DoubleNavbar";

function Homepage() {

    return(
        
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/premium">Premium</Link>
                </li>
                <li>
                    <Link href="/profile">Profile</Link>
                </li>
                <li>
                    <Link href="/images">Image</Link>
                </li>
                
            </ul>
        </nav>
    );
    

}

export default Homepage;