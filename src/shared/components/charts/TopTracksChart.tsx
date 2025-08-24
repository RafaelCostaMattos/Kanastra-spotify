import React from 'react';
import { useTopTracks } from '../../hooks/useTopTracks.hook';
import { Track } from '../../interfaces/track.interface';

const TopTracksChart: React.FC = () => {
    

    return (
        <div>
            <h2>Top Tracks</h2>
            {/* <Bar data={chartData} /> */}
        </div>
    );
};

export default TopTracksChart;