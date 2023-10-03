import React, { useEffect } from 'react';
import MainWrapper from '../components/MainWrapper';
import Animation from '../components/Animation';
import { machineStatus } from '../redux/dashboard';
import { useDispatch, useSelector } from 'react-redux';

const MachineStatus = () => {
  const dispatch = useDispatch();

  const { statusData } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(machineStatus());
  }, []);
  return (
    <>
      <MainWrapper title="Machine Status">
        <div className="total_machine_statussec">
          <div className="row line_row">
            <div className="col-2">
              <div className="co_card">
                <span>
                  <Animation type="Tower" />
                </span>
              </div>
            </div>

            <div className="col-10">
              <h3>MD Assembly</h3>
              <div className="total_machinecard">
                {statusData.map((ldat, index) => {
                  let filterData = ldat?.DEPARTMENTID;
                  return filterData == 1 ? (
                    <div key={index} className="total_linecard">
                      <h5>{ldat.MACHINENAME}</h5>
                      <div
                        className={
                          ldat.CommStatus === 'OK' ? 'status2' : 'status1'
                        }>
                        <span></span>
                      </div>
                      <p>
                        Current Idle Time:{' '}
                        <span>
                          {ldat.filterData?.CurrentDownTime
                            ? ldat.filterData?.CurrentDownTime
                            : '0'}{' '}
                          Min
                        </span>
                      </p>
                      <p>
                        Shift Idle Time:{' '}
                        <span>
                          {ldat.filterData?.ShiftDowntime
                            ? ldat.filterData?.ShiftDowntime
                            : '0'}{' '}
                          Min
                        </span>
                      </p>
                    </div>
                  ) : (
                    ''
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row line_row">
            <div className="col-2">
              <div className="co_card">
                <span>
                  <Animation type="Tower" />
                </span>
                {/* <h6>Co-Ordinator</h6> */}
              </div>
            </div>
            <div className="col-10">
              <h3>MD Packing</h3>
              <div className="total_machinecard">
                {statusData.map((ldat, index) => {
                  let filterData = ldat?.DEPARTMENTID;
                  return filterData == 2 ? (
                    <div key={index} className="total_linecard">
                      <h5>{ldat.MACHINENAME}</h5>
                      <div
                        className={
                          ldat?.CommStatus === 'OK' ? 'status2' : 'status1'
                        }>
                        <span></span>
                      </div>
                      <p>
                        Idle Time:{' '}
                        <span>
                          {ldat.filterData?.CurrentDownTime
                            ? ldat.filterData?.CurrentDownTime
                            : '0'}{' '}
                          Min
                        </span>
                      </p>
                      <p>
                        Shift Idle Time:{' '}
                        <span>
                          {ldat.ShiftDowntime ? ldat.ShiftDowntime : '0'} Min
                        </span>
                      </p>
                    </div>
                  ) : (
                    ''
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

export default MachineStatus;
