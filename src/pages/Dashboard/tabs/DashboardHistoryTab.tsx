import React from 'react'
import DashboardHistoryTable from 'components/Table/Dashboard/History'
import AppBody from '../../AppBody'

export default function DashboardHistoryTab() {
  return (
    <>
      <AppBody size="lg">
        <DashboardHistoryTable />
      </AppBody>
    </>
  )
}
