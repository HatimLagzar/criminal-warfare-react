const UserInfo = (props) => {
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td>Level:</td>
						<td>514</td>
					</tr>
					<tr>
						<td>Money:</td>
						<td>$0 </td>
					</tr>
					<tr>
						<td>Bank:</td>
						<td>$537,541,587</td>
					</tr>
					<tr>
						<td>Points:</td>
						<td>
							<span id="info-points">1,506,473</span> +{" "}
							<a href="/point_dealer.php">
								<span id="info-dpoints">16,739</span>
							</a>
						</td>
					</tr>
					<tr>
						<td>Activity:</td>
						<td>
							92,222 <a href="/activity_points.php">[spend]</a>
						</td>
					</tr>
					<tr>
						<td>Credits:</td>
						<td>
							62,900 <a href="/upgrade.php">[buy/use]</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default UserInfo;
