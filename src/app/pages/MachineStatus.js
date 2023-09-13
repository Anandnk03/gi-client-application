import React from 'react'
import MainWrapper from '../components/MainWrapper'
import { TfiSignal } from 'react-icons/tfi'
import { machineStatusDatas } from '../config/dataScheme'


const MachineStatus = () => {
    return (
        <>
            <MainWrapper title="Machine Status">
                <div className="total_machine_statussec">

                    <div className="row line_row">
                        <div className="col-2">
                            <div className="co_card">
                                <span>
                                    <TfiSignal />
                                </span>
                                <h6>Co-Ordinator</h6>
                            </div>
                        </div>
                        <div className="col-10">
                            <h3>Line 1</h3>
                            <div className="total_machinecard">
                                {
                                    machineStatusDatas.map((ldat, index) => {
                                        return (
                                            <div key={index} className="total_linecard">
                                                <h5>{ldat.machine_name}</h5>
                                                <div className={ldat.active_status ? 'status1' : 'status2'}>
                                                    <span></span>
                                                </div>
                                                <p >Idle Time: <span>{ldat.idle_time ? ldat.idle_time : '0'} Min</span></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row line_row">
                        <div className="col-2">
                            <div className="co_card">
                                <span>
                                    <TfiSignal />
                                </span>
                                <h6>Co-Ordinator</h6>
                            </div>
                        </div>
                        <div className="col-10">
                            <h3>Line 2</h3>
                            <div className="total_machinecard">
                                {
                                    machineStatusDatas.map((ldat, index) => {
                                        return (
                                            <div key={index} className="total_linecard">
                                                <h5>{ldat.machine_name}</h5>
                                                <div className={ldat.active_status ? 'status1' : 'status2'}>
                                                    <span></span>
                                                </div>
                                                <p >Idle Time: <span>{ldat.idle_time ? ldat.idle_time : '0'} Min</span></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </MainWrapper>
        </>
    )
}

export default MachineStatus