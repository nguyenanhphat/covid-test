import React from 'react';
import ModalCustom from '../common/Modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { numberWithCommas } from '../../utils/numberHelper';
import { formatDateShort, formatDate } from '../../utils/dateHelper';
import './styles.css';

const CovidDetail = ({
	detailData = [],
	toggleModal
}) => {
	const [covidInfo, covidPeriodTime] = detailData;
	return (
		<div>
			<ModalCustom onClose={toggleModal} title="Detail Information" show={true}>
				<div className='info-covid'>
					<div className="line-item info-name">
						<img src={covidInfo[0]?.flags?.png} alt="flag-country" width={40}/>
						<span>{covidInfo[0]?.name?.common}</span>
					</div>
					<div className="line-item">
						<label className="label-info">Population:</label>
						<div className="value-info">{numberWithCommas(covidInfo[0]?.population)}</div>
					</div>
					<div className="line-item">
						<label className="label-info">Capital:</label>
						<div className="value-info">
							{(covidInfo[0]?.capital || []).map((capital, index) => (
								<span key={index}>{capital}</span>
							))}
						</div>
					</div>
					<div className="line-item">
						<label className="label-info">Subregion:</label>
						<div className="value-info">{covidInfo[0]?.subregion}</div>
					</div>
				</div>
				
				<div className="covid-period-time">
					<h2 className="header-total">Total covid case in {covidInfo[0]?.name?.common}</h2>
					
					{covidPeriodTime.length ? (
						<div className="content-chart">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									width={500}
									height={300}
									data={covidPeriodTime}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="Date" tickFormatter={data => {
										return formatDateShort(data);
									}} />
									<YAxis tickFormatter={data => {
										return numberWithCommas(data);
									}} />
									<Tooltip 
										formatter={data => {
											return numberWithCommas(data);
										}} 
										labelFormatter={data => {
											return formatDate(data)
										}} 
									/>
									<Legend />
									<Line type="monotone" dataKey="Confirmed" stroke="#82ca9d" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div className="empty-data">No Data</div>
					)
				}
					
					
					
					
				</div>
			</ModalCustom>
		</div>
	)
}

export default CovidDetail;
