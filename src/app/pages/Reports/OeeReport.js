import React from 'react'
import ProgressChart from '../Layout/ProgressChart';
import MainWrapper from '../../components/MainWrapper';

const OeeReport = () => {
    return (
        <>
            <MainWrapper title="OEE Report">
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
                                <div class="chart chart-sm">
                                    <div className="row">
                                        <div className="col-12 progressChart">
                                            <div className="w-50 m-auto">
                                                <ProgressChart oeeData={0.8} />
                                            </div>
                                        </div>
                                        <div className="col-4 mt-1">
                                            <label className="text-center d-block fw-bold ">Availability</label>
                                            <ProgressChart oeeData={0.4} />
                                        </div>
                                        <div className="col-4 mt-1">
                                            <label className="text-center d-block fw-bold">Performance</label>
                                            <ProgressChart oeeData={0.6} />
                                        </div>
                                        <div className="col-4 mt-1">
                                            <label className="text-center d-block fw-bold">Quality</label>
                                            <ProgressChart oeeData={0.9} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </MainWrapper>
        </>
    )
}

export default OeeReport