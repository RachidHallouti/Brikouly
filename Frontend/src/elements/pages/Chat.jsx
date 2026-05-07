import React, { useEffect, useState } from "react"
import api from "../../assets/api"
import { Divide } from "lucide-react"

export default function Chat() {
  const [convs, setConvs] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("api/conversations")
        setConvs(res.data)
      } catch (error) {}
    }
    fetchData()
  }, [])
  return (
    <main>
      <div>
        {convs.length > 0 &&
          convs.map((c) => <div>{c.latest_message?.content}</div>)}
      </div>
    </main>
  )
}
