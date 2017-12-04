export module Settings {

    export const SCENE_SCALE = 25;
    export const TRACK_RADIUS = 5;

    export const CAMERA_ORTHOGRAPHIC_HEIGHT = 256 - 64;
    export const CAMERA_ORTHOGRAPHIC_FIELD_OF_VIEW = 80;
    export const CAMERA_ORTHOGRAPHIC_NEAR_CLIPPING_PANE = 0;
    export const CAMERA_ORTHOGRAPHIC_FAR_CLIPPING_PANE = 256;

    export const CAMERA_PERSPECTIVE_HEIGHT = 8;
    export const CAMERA_PERSPECTIVE_MAXIMUM_DISTANCE = 16;
    export const CAMERA_PERSPECTIVE_FIELD_OF_VIEW = 70;
    export const CAMERA_PERSPECTIVE_NEAR_CLIPPING_PANE = 1;
    export const CAMERA_PERSPECTIVE_FAR_CLIPPING_PANE = 4000;

    export const CAMERA_INITIAL_ZOOM = 1;
    export const CAMERA_ZOOM_CHANGE = 0.05;

    export const VEHICLE_NAME = 'vehicle';

    export const HUD_HEIGHT_RATIO = 0.8;
    export const HUD_INVERSE_HEIGHT_RATIO = 0.2;
    export const HUD_RACE_INFO_GEOMETRY_WIDTH_RATIO = 0.2;
    export const HUD_RACE_INFO_GEOMETRY_HEIGHT_RATIO = 0.75;
    export const HUD_RACE_INFO_BOX_LEFT_OFFSET = 0.4;
    export const HUD_RACE_INFO_BOX_RIGHT_OFFSET = 0.15;
    export const HUD_TEXT_WIDTH_OFFSET = 0.1;
    export const HUD_TEXT_HEIGHT_OFFSET = 0.55;
    export const HUD_BITMAP_FONT = 'Bold 100px Arial';
    export const HUD_BITMAP_FILLSTYLE = 'rgba(0,0,0,0.75)';
    export const HUD_START_LAP_COUNTDOWN = '0/3';
    export const HUD_BITMAP_TEXT_ALIGN = 'center';
    export const RED = 0xff0000;
    export const TOTAL_LAPS = 3;

    export const DRIVE_MODIFIER_BOOSTER_SPEED_MULTIPLIER = 1.5;
    export const DRIVE_MODIFIER_BOOSTER_POSITION = 0;
    export const DRIVE_MODIFIER_BOOSTER_ACCELERATION = 1;
    export const DRIVE_MODIFIER_BOOSTER_DECELERATION = 0;
    export const DRIVE_MODIFIER_BOOSTER_ROTATION = 1;
    export const DRIVE_MODIFIER_BOOSTER_TIME = 60 * 2;
}
