import { useEffect, useState } from "react"


const useFetch = (url) => {
    
    const[loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        setLoading(true)
        setError(null)

        const getData = async () => {
        try {
            const res = await fetch(url)
            if(!res.ok){
                throw new Error(res.status)
            }
            const response = await res.json()
            setData(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [url, refreshKey]);

    const refetch = () => setRefreshKey((k) => k + 1)

    return {
        loading,
        data,
        error,
        refetch,
    }
}


export default useFetch