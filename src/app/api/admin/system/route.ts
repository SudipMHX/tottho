import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import mongoose from 'mongoose'
import os from 'os'

export const dynamic = 'force-dynamic' // Ensure this route is never cached statically

export async function GET() {
  // Ensure DB is connected
  await connectDB()

  // OS Info
  const cpus = os.cpus()
  const cpuModel = cpus.length > 0 ? cpus[0].model : 'Unknown'
  const cpuCores = cpus.length

  const osInfo = {
    platform: os.platform(),
    release: os.release(),
    type: os.type(),
    arch: os.arch(),
    uptime: os.uptime(),
    hostname: os.hostname(),
    cpu: {
      model: cpuModel,
      cores: cpuCores,
      loadavg: os.loadavg(), // [1, 5, 15] minute averages
    },
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
    }
  }

  // Process Info
  const processInfo = {
    version: process.version,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    pid: process.pid,
  }

  // Database Info
  const connectionStates = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting', 'Uninitialized']
  const dbState = mongoose.connection.readyState
  
  const dbInfo = {
    status: connectionStates[dbState] || 'Unknown',
    host: mongoose.connection.host || 'Unknown',
    name: mongoose.connection.name || 'Unknown',
    modelsCount: Object.keys(mongoose.models).length,
  }

  return NextResponse.json({
    timestamp: Date.now(),
    os: osInfo,
    process: processInfo,
    database: dbInfo,
  })
}
