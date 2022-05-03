### Theatrixx xPressCue

This is the official Theatrixx xPressCue Companion module.
This module interfaces with and allows you to control the Theatrixx xPressCue media player.

### Configuration

- **Host IP address**: The IP address of the remote xPressCue
- **Host Port**: The port of the remote xPressCue (normally always `80`)

### Actions

- **Set Play State**: Changes or toggles the current play state (`Play`/`Pause`/`Stop`)
- **Set Next Media**: Loads the selected `Media` as `Next`
- **Take**: Executes a TAKE command (with or without automatic playback)
- **Jump Playback**: Jumps forward or behind in playback
- **Next Frame**: Jumps one frame ahead (and pauses playback)
- **Load Playlist**: Appends or replace a playlist to the Live Queue
- **Skip Queue**: Skips to previous or next item on the Live Queue
- **Clear Queue**: Clears the Live Queue
- **Set Play Mode**: Sets the Playback Mode (`Playlist`, `AB Preset` or `Direct`)
- **Set Output Mode**: Sets the Video Output Mode (`Normal`, `Test Pattern`, `Identify` or `Blackout`)
- **Set Master Intensity**: Sets the Master Video Intensity to a specified value
- **Set Master Volume**: Sets the Master Audio Volume to a specified value
- **Set Test Pattern**: Set the current test pattern (test pattern mode must be activated separately)
- **Set Multi-Device Mode**: Toggles between `Master` and `Follower` mode (useful for quickly switching between main and backup devices)
- **Identify**: Activate the `Identify` mode on the device. This will make all LEDs on the front panel of the device to blink white for a few seconds.

### Feedbacks

- **Media Name**: Dynamically updates the button text to match the name of the selected Media
- **Media State**: Indicates wether the selected Media is `Current` or `Next`
- **Time Remaining**: Indicates wether the `Remaining` time on the device matches the selected value
- **Play State**: Indicates wether the device is currently in the selected Play State (`Playing`, `Paused` or `Stopped`)
- **Playlist Name**: Dynamically updates the button text to match the name of the selected Playlist
- **Play Mode**: Indicates wether the device is currently in the selected Play Mode (`Playlist`, `AB Preset` or `Direct`)
- **Output Mode**: Indicates wether the device is currently in the selected Output Mode (`Normal`, `Test Pattern`, `Identify` or `Blackout`)
- **Multi Device Mode**: Indicates wether the device is in `Master` or `Follower` mode
- **Device Busy**: Indicates wether the device is busy, or ready to accept new commands

### Presets
