import React from 'react'

const HourlyDashBoard = () => {
    return (
        <>
            <div className="hourly-production">
                {/* <Navbar name={name} handleStatus={handleDelete} />
                <div className="container-fluid">
                    {sdate != null ? (
                        <h2 className="header-name">
                            SHIFTDATE: {sdate} - SHIFT: {shifts}
                        </h2>
                    ) : (
                        ''
                    )} */}
                <div className="row">
                    {/* {hourlyData.map((item, index) => {
                            let plans_total = 0;
                            let actual_total = 0;
                            let gap_total = 0;
                            return ( */}
                    <div className="col-sm-12 col-lg-6 col-md-12 "
                    //  key={index}
                    >
                        <div className="card mt-3">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-7">
                                        <span>
                                            {/* {item.title} */}
                                            Resistance Testing 2
                                        </span>
                                    </div>
                                    <div className="col-2">
                                        <span>Man:  10
                                            {/* {item.manPower} */}
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        <span>Shift: A
                                            {/* {item.shift} */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-bordered table-condensed">
                                    <tbody>
                                        <tr>
                                            <th>Hours</th>
                                            {/* {item.values.map((da, index) => {
                                                return <td key={index}>{da.HOURDESCRIPITION}</td>;
                                            })} */}
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <th>Total</th>
                                        </tr>
                                        <tr>
                                            <th>Plan</th>
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <th>450</th>
                                            {/* {item.values.map((da, index) => {
                                                plans_total = Number(plans_total) + Number(da.Plan);
                                                return da.Plan > 0 ? (
                                                    <td key={index}>{da.Plan}</td>
                                                ) : (
                                                    ''
                                                );
                                            })} */}
                                            {/* {plans_total > 0 ? (
                                                <td className="totalall">{plans_total}</td>
                                            ) : (
                                                <td colSpan="10" className="tdNoPlan">
                                                    No Plan !
                                                </td>
                                            )} */}
                                        </tr>
                                        <tr>
                                            <th>Actual</th>
                                            {/* {item.values.map((da, index) => {
                                                actual_total =
                                                    Number(actual_total) + Number(da.Actual);
                                                return (
                                                    <td key={index} className="styleactual">
                                                        {da.Actual}
                                                    </td>
                                                );
                                            })} */}
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <th>450</th>
                                            {/* <td className="totalall">
                                                {actual_total}
                                            </td> */}
                                        </tr>
                                        <tr className="status">
                                            <th>Gap</th>
                                            {/* {item.values.map((da, index) => {
                                                gap_total = Number(gap_total) + Number(da.Gap);
                                                gap_total = gap_total < 0 ? 0 : gap_total;
                                                return (
                                                    <td key={index} className={'color' + da.CssColor}>
                                                        {da.Gap <= 0 ? '' : da.Gap}
                                                    </td>
                                                );
                                            })} */}
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <td className="totalall">
                                                {/* {gap_total} */}
                                                500
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-12 "
                    //  key={index}
                    >
                        <div className="card mt-3">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-7">
                                        <span>
                                            {/* {item.title} */}
                                            Resistance Testing 2
                                        </span>
                                    </div>
                                    <div className="col-2">
                                        <span>Man:  10
                                            {/* {item.manPower} */}
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        <span>Shift: A
                                            {/* {item.shift} */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-bordered table-condensed">
                                    <tbody>
                                        <tr>
                                            <th>Hours</th>
                                            {/* {item.values.map((da, index) => {
                                                return <td key={index}>{da.HOURDESCRIPITION}</td>;
                                            })} */}
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <th>Total</th>
                                        </tr>
                                        <tr>
                                            <th>Plan</th>
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <th>450</th>
                                            {/* {item.values.map((da, index) => {
                                                plans_total = Number(plans_total) + Number(da.Plan);
                                                return da.Plan > 0 ? (
                                                    <td key={index}>{da.Plan}</td>
                                                ) : (
                                                    ''
                                                );
                                            })} */}
                                            {/* {plans_total > 0 ? (
                                                <td className="totalall">{plans_total}</td>
                                            ) : (
                                                <td colSpan="10" className="tdNoPlan">
                                                    No Plan !
                                                </td>
                                            )} */}
                                        </tr>
                                        <tr>
                                            <th>Actual</th>
                                            {/* {item.values.map((da, index) => {
                                                actual_total =
                                                    Number(actual_total) + Number(da.Actual);
                                                return (
                                                    <td key={index} className="styleactual">
                                                        {da.Actual}
                                                    </td>
                                                );
                                            })} */}
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <th>450</th>
                                            {/* <td className="totalall">
                                                {actual_total}
                                            </td> */}
                                        </tr>
                                        <tr className="status">
                                            <th>Gap</th>
                                            {/* {item.values.map((da, index) => {
                                                gap_total = Number(gap_total) + Number(da.Gap);
                                                gap_total = gap_total < 0 ? 0 : gap_total;
                                                return (
                                                    <td key={index} className={'color' + da.CssColor}>
                                                        {da.Gap <= 0 ? '' : da.Gap}
                                                    </td>
                                                );
                                            })} */}
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <td className="totalall">
                                                {/* {gap_total} */}
                                                500
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-12 "
                    //  key={index}
                    >
                        <div className="card mt-3">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-7">
                                        <span>
                                            {/* {item.title} */}
                                            Resistance Testing 2
                                        </span>
                                    </div>
                                    <div className="col-2">
                                        <span>Man:  10
                                            {/* {item.manPower} */}
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        <span>Shift: A
                                            {/* {item.shift} */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-bordered table-condensed">
                                    <tbody>
                                        <tr>
                                            <th>Hours</th>
                                            {/* {item.values.map((da, index) => {
                                                return <td key={index}>{da.HOURDESCRIPITION}</td>;
                                            })} */}
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <th>Total</th>
                                        </tr>
                                        <tr>
                                            <th>Plan</th>
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <th>450</th>
                                            {/* {item.values.map((da, index) => {
                                                plans_total = Number(plans_total) + Number(da.Plan);
                                                return da.Plan > 0 ? (
                                                    <td key={index}>{da.Plan}</td>
                                                ) : (
                                                    ''
                                                );
                                            })} */}
                                            {/* {plans_total > 0 ? (
                                                <td className="totalall">{plans_total}</td>
                                            ) : (
                                                <td colSpan="10" className="tdNoPlan">
                                                    No Plan !
                                                </td>
                                            )} */}
                                        </tr>
                                        <tr>
                                            <th>Actual</th>
                                            {/* {item.values.map((da, index) => {
                                                actual_total =
                                                    Number(actual_total) + Number(da.Actual);
                                                return (
                                                    <td key={index} className="styleactual">
                                                        {da.Actual}
                                                    </td>
                                                );
                                            })} */}
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <th>450</th>
                                            {/* <td className="totalall">
                                                {actual_total}
                                            </td> */}
                                        </tr>
                                        <tr className="status">
                                            <th>Gap</th>
                                            {/* {item.values.map((da, index) => {
                                                gap_total = Number(gap_total) + Number(da.Gap);
                                                gap_total = gap_total < 0 ? 0 : gap_total;
                                                return (
                                                    <td key={index} className={'color' + da.CssColor}>
                                                        {da.Gap <= 0 ? '' : da.Gap}
                                                    </td>
                                                );
                                            })} */}
                                            <td>100</td>
                                            <td>200</td>
                                            <td>300</td>
                                            <td>40</td>
                                            <td>50</td>
                                            <td>60</td>
                                            <td>70</td>
                                            <td>80</td>
                                            <td>90</td>
                                            <td className="totalall">
                                                {/* {gap_total} */}
                                                500
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* );
                        })} */}
                </div>
                {/* <BootstrapModal handleClose={handleClose} show={show}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Select Your Dashboard
                        </Modal.Title>
                    </Modal.Header>
                    <form action="" method="get">
                        <div className="modal-form">
                            <div className="row">
                                <div className="col-12 dashMenus">
                                    <div className="dashMenuItem">
                                        <img
                                            src={Hour}
                                            className="hour-images"
                                            onClick={() => HourClick()}
                                        />
                                        <div>Hourly Dashboard</div>
                                    </div>
                                    <div className="dashMenuItem">
                                        <img
                                            src={OEE}
                                            className="hour-images"
                                            onClick={() => OeeClick()}
                                        />
                                        <div>OEE Dashboard</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </BootstrapModal>
                <SelectMoadl handleClose={handleSelect} show={show1}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Please Select Your Modules
                        </Modal.Title>
                    </Modal.Header>
                    <form action="/production/hourlydashboard" method="get">
                        <div className="modal-form">
                            <div className="row">
                                <div className="col-10">
                                    <select
                                        className="form-select"
                                        required
                                        aria-label="Default select example"
                                        name="id">
                                        <option>--Select Your Modules--</option>
                                        {module.map((item, index) => {
                                            return (
                                                <option key={index} value={item?.MODULEORDER}>
                                                    {item?.MODULES}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="col-2 mt-3">
                                    <span>Past Data</span>
                                    &nbsp;
                                    <input
                                        class="form-check-input"
                                        checked={isPastData}
                                        type="checkbox"
                                        onClick={handleClick}
                                    />
                                </div>
                                {isPastData && (
                                    <>
                                        <div className="col-6" style={{ marginBottom: '10px' }}>
                                            <span>Shift Date</span>
                                            <input
                                                type="date"
                                                name="sdate"
                                                className="form-control"
                                                disabled={isDisabled}
                                                required
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-6" style={{ marginBottom: '10px' }}>
                                            <span>Shift</span>
                                            <select
                                                name="shift"
                                                className="form-control"
                                                disabled={isDisabled}>
                                                <option>----Select Shift---</option>
                                                <option value="1"> 1 </option>
                                                <option value="2"> 2 </option>
                                                <option value="3"> 3 </option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handleSelect}>
                                Close
                            </Button>
                            <Button type="submit">View</Button>
                        </Modal.Footer>
                    </form>
                </SelectMoadl>
                <SelectOee handleClose={handle3} show={show2}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Please Select Your Cell And MachineName
                        </Modal.Title>
                    </Modal.Header>
                    <form action="/production/dashboard" method="get">
                        <div className="modal-form">
                            <div className="row">
                                <div className="col-5 select-data">
                                    <select
                                        className="form-select drop"
                                        name="module"
                                        onChange={handleChange}>
                                        <option>--Select CellName--</option>
                                        {module.map((item, index) => {
                                            return (
                                                <option key={index} value={item?.MODULEORDER}>
                                                    {item?.MODULES}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="col-5">
                                    <select className="form-select drop" name="id">
                                        <option>--Select MachineName--</option>
                                        {machine.map((item, index) => {
                                            return (
                                                <option key={index} value={item?.MachineId}>
                                                    {item?.MACHINENAME}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="col-2 mt-3">
                                    <span>Past Data</span>
                                    &nbsp;
                                    <input
                                        class="form-check-input"
                                        checked={isPastData}
                                        type="checkbox"
                                        onClick={handleClick}
                                    />
                                </div>
                                {isPastData && (
                                    <>
                                        <div className="col-6" style={{ marginBottom: '10px' }}>
                                            <span>Shift Date</span>
                                            <input
                                                type="date"
                                                name="sdate"
                                                className="form-control"
                                                disabled={isDisabled}
                                                required
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-6" style={{ marginBottom: '10px' }}>
                                            <span>Shift</span>
                                            <select
                                                name="shift"
                                                className="form-control"
                                                disabled={isDisabled}>
                                                <option>----Select Shift---</option>
                                                <option value="1">A</option>
                                                <option value="2">B</option>
                                                <option value="3">C</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handle3}>
                                Close
                            </Button>
                            <Button type="submit">View</Button>
                        </Modal.Footer>
                    </form>
                </SelectOee> */}
            </div>
        </>
    )
}

export default HourlyDashBoard