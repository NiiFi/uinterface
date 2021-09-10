import React from 'react'
import HistoryTable from './components/HistoryTable'
import AppBody from '../../../AppBody'

export default function DashboardHistoryTab() {
  return (
    <>
      <AppBody size="lg">
        <HistoryTable />
      </AppBody>
    </>
  )
}
