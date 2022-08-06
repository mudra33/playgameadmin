import { useRouter } from 'next/router';
import Layout from '../components/Layout/Pre';
import { useSession } from 'next-auth/client';
import PrimaryButton from '../components/Button/PrimaryButton';

export default function Page() {
    const router = useRouter();
    const [session] = useSession();

    return (
        <Layout title="Home">
            <PrimaryButton
                text={session ? 'Home' : 'Login'}
                onClick={() => {
                    if (session) {
                        const role =
                            session && session.user && session.user.RoleName
                                ? session.user.RoleName.toLowerCase()
                                : 'customer';
                        router.push(`${role}/home`);
                    }

                    router.push('/auth/login');
                }}
            />
        </Layout>
    );
}
