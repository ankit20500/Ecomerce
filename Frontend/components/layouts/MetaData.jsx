import Helmet from 'react-helmet'
export default function({title}){
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}