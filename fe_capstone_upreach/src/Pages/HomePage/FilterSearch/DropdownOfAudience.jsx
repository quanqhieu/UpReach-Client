import React, { useState } from 'react'
import ButtonDropdow from './ButtonDropdow';
import { Button, Dropdown, Slider, Checkbox, Row, Col } from "antd";
import { GENDER_OF_AUDIANCE, LOCATION_OF_AUDIANCE } from '../ConstHomePage';
import Selects from '../../../Components/UI/Selects';

const DropdownOfAudience = () => {
    const [valueAge, setValueAge] = useState([20, 50]);
    const [valueGender, setValueGender] = useState();
    const [valueLocation, setValuelocation] = useState();

    function handleOnChangeAge(sliderValue) {
        setValueAge(sliderValue);
    }
    function handleOnChangeGender(checkValue) {
        setValueGender(checkValue);
    }
    function handleOnChangelocation(selectValue) {
        setValuelocation(selectValue);
    }

    console.log(`age: ${valueAge}, gender: ${valueGender}, location: ${valueLocation}`)

    function handleBtnClear() {
        setValueAge([20, 50]);
        setValueGender()
        setValuelocation()
    }

    return (
        <Dropdown
            dropdownRender={() => (
                <div className="popupFilter mt-2 width-400 shadowBox p-3">
                    <div className="row">
                        <div className="col-12">
                            {/* Filter Age of audiance */}
                            <div className="fw-bold">Audiance Age</div>
                            <Slider
                                range={{ draggableTrack: true }}
                                value={valueAge}
                                onChange={handleOnChangeAge}
                            />
                        </div>
                        {/* Filter gender of audiance */}
                        <div className="col-12">
                            <div className="fw-bold">Audience Gender</div>
                            <Checkbox.Group
                                style={{
                                    width: "100%",
                                }}
                                onChange={handleOnChangeGender}
                                value={valueGender}
                            >
                                <Row>
                                    {GENDER_OF_AUDIANCE.map((item) => (
                                        <Col span={24}>
                                            <Checkbox value={item.value}>{item.name}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </div>
                        {/* Filter location of audiance */}
                        <div className="col-12 mt-3">
                            <div className="fw-bold">Audience Locations</div>
                            <div className="selectFilterAudiance">
                                <Selects
                                    className="inputSelect"
                                    mode="multiple"
                                    options={LOCATION_OF_AUDIANCE}
                                    placeholder="Location"
                                    value={valueLocation}
                                    onChange={handleOnChangelocation}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <Button className="fw-bold mt-4" onClick={handleBtnClear}>Clear</Button>
                        </div>
                    </div>
                </div>
            )}
        >
            <a onClick={(e) => e.preventDefault()}>
                <ButtonDropdow titleBtn="Audience" />
            </a>
        </Dropdown>
    )
}

export default DropdownOfAudience