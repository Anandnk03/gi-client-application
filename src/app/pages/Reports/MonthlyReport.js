import React from 'react'
import MainWrapper from '../../components/MainWrapper'
import BarChart from '../Layout/BarChart';

const MonthlyReport = () => {
    return (
        <>
            <MainWrapper title="Monthly Production">
                <main class="content">
                    <div class="container-fluid p-0">
                        <div class="mb-3">
                            <div className="row">
                                <div className="col-12" style={{ textAlign: 'right' }}>
                                    <button className="btn btn-outline-dark text-right">
                                        Select Your Machine
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="card">
                                <div class="chart">
                                    <BarChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </MainWrapper>
        </>
    )
}

export default MonthlyReport