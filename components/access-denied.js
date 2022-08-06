import Link from 'next/link';
import { signIn } from 'next-auth/client';

export default function AccessDenied() {
    return (
        <>
            <h1>Access Denied</h1>
            <p>
                <Link
                    href="/auth/login"
                    onClick={(e) => {
                        e.preventDefault();
                        signIn();
                    }}>
                    You must be signed in to view this page
                </Link>
            </p>
        </>
    );
}
