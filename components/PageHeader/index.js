import PropTypes from 'prop-types';
import Breadcrumb from '../Breadcrumb';
import { useRouter } from 'next/router';
import PrimaryButton from '../Button/PrimaryButton';

export default function PageHeader(props) {
    const router = useRouter();

    return (
        <div
            className="ms-Grid"
            dir="ltr"
            style={{
                margin: '5vh 0',
            }}>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    <Breadcrumb items={props.breadcrumb} />
                </div>

                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    {props.button && props.button.text ? (
                        <PrimaryButton text={props.button.text} onClick={() => router.push(props.button.link)} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string,
    button: PropTypes.object,
    breadcrumb: PropTypes.array,
};
