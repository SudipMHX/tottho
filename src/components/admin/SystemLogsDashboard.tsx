'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiServer, FiCpu, FiDatabase, FiActivity, FiClock, FiRefreshCw } from 'react-icons/fi'

type SystemStats = {
  timestamp: number
  os: {
    platform: string
    release: string
    type: string
    arch: string
    uptime: number
    hostname: string
    cpu: {
      model: string
      cores: number
      loadavg: number[]
    }
    memory: {
      total: number
      free: number
      used: number
    }
  }
  process: {
    version: string
    uptime: number
    memoryUsage: {
      rss: number
      heapTotal: number
      heapUsed: number
      external: number
    }
    pid: number
  }
  database: {
    status: string
    host: string
    name: string
    modelsCount: number
  }
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${d}d ${h}h ${m}m ${s}s`
}

export default function SystemLogsDashboard() {
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchStats = async (isBackground = false) => {
    if (!isBackground) setLoading(true)
    else setRefreshing(true)

    try {
      const res = await fetch('/api/admin/system')
      if (res.ok) {
        setStats(await res.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchStats()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => fetchStats(true), 3000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <FiRefreshCw className="animate-spin text-3xl" />
      </div>
    )
  }

  if (!stats) return null

  const memPercent = (stats.os.memory.used / stats.os.memory.total) * 100
  const heapPercent = (stats.process.memoryUsage.heapUsed / stats.process.memoryUsage.heapTotal) * 100

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FiClock className="text-gray-500" />
          Last updated: {new Date(stats.timestamp).toLocaleTimeString()}
          {refreshing && <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full animate-pulse">Live</span>}
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)} 
              className="rounded bg-gray-800 border-gray-700 text-[#FF5240] focus:ring-[#FF5240]/50"
            />
            Auto-refresh (3s)
          </label>
          <button 
            onClick={() => fetchStats(true)} 
            disabled={refreshing}
            className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            title="Manual refresh"
          >
            <FiRefreshCw className={refreshing ? 'animate-spin text-[#FF5240]' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* OS Stats */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white font-semibold">
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg"><FiServer size={20} /></div>
            Server Environment
          </div>
          <div className="space-y-3 mt-2 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Hostname</span>
              <span className="text-white font-medium">{stats.os.hostname}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Platform</span>
              <span className="text-white font-medium capitalize">{stats.os.type} {stats.os.release}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-400">System Uptime</span>
              <span className="text-white font-medium">{formatUptime(stats.os.uptime)}</span>
            </div>
          </div>
        </motion.div>

        {/* CPU Stats */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="card flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white font-semibold">
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg"><FiCpu size={20} /></div>
            CPU & Load Average
          </div>
          <div className="space-y-3 mt-2 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Processor</span>
              <span className="text-white font-medium truncate max-w-[150px]" title={stats.os.cpu.model}>{stats.os.cpu.model}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Cores</span>
              <span className="text-white font-medium">{stats.os.cpu.cores} logical</span>
            </div>
            <div className="flex justify-between pb-2 items-center">
              <span className="text-gray-400">Load (1m, 5m, 15m)</span>
              <div className="flex gap-1.5">
                {stats.os.cpu.loadavg.map((l, i) => (
                  <span key={i} className="bg-gray-800 px-2 py-0.5 rounded-md text-xs font-mono">{l.toFixed(2)}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Database Stats */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="card flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white font-semibold">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg"><FiDatabase size={20} /></div>
            Database (MongoDB)
          </div>
          <div className="space-y-3 mt-2 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Status</span>
              <span className={`font-medium ${stats.database.status === 'Connected' ? 'text-emerald-400' : 'text-red-400'}`}>
                {stats.database.status}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Database Name</span>
              <span className="text-white font-medium">{stats.database.name}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-400">Registered Models</span>
              <span className="text-white font-medium">{stats.database.modelsCount} models</span>
            </div>
          </div>
        </motion.div>

        {/* System Memory */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="card flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white font-semibold">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg"><FiActivity size={20} /></div>
            System Memory (RAM)
          </div>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Used: <span className="text-white">{formatBytes(stats.os.memory.used)}</span></span>
              <span className="text-gray-400">Total: <span className="text-white">{formatBytes(stats.os.memory.total)}</span></span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500" 
                initial={{ width: 0 }}
                animate={{ width: `${memPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-right text-xs text-amber-400 mt-1">{memPercent.toFixed(1)}% Consumed</p>
          </div>
        </motion.div>

        {/* Node Process Memory */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="card flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white font-semibold">
            <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-lg"><FiActivity size={20} /></div>
            Node.js Memory
          </div>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Heap Used: <span className="text-white">{formatBytes(stats.process.memoryUsage.heapUsed)}</span></span>
              <span className="text-gray-400">Total Heap: <span className="text-white">{formatBytes(stats.process.memoryUsage.heapTotal)}</span></span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-pink-500" 
                initial={{ width: 0 }}
                animate={{ width: `${heapPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-right text-xs text-pink-400 mt-1">RSS: {formatBytes(stats.process.memoryUsage.rss)}</p>
          </div>
        </motion.div>

        {/* Process Details */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="card flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white font-semibold">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-lg"><FiServer size={20} /></div>
            Process Info
          </div>
          <div className="space-y-3 mt-2 text-sm">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Node Version</span>
              <span className="text-white font-medium">{stats.process.version}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Process ID</span>
              <span className="text-white font-medium font-mono">{stats.process.pid}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-400">App Uptime</span>
              <span className="text-white font-medium">{formatUptime(stats.process.uptime)}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
