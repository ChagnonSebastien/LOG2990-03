import { VehicleColor } from './vehicle-color';

export module Settings {

    export const SCENE_SCALE = 25;
    export const TRACK_HEIGHT = 3;
    export const TRACK_RADIUS = 5;
    export const HUMAN_COLOR = VehicleColor.red;

    export const ASSETS_FOLDER = '/assets';
    export const SOUND_COUNTDOWN = 'sounds/countdown.mp3';
    export const SOUND_RACE = 'sounds/race.mp3';
    export const SOUND_STIGNER = 'sounds/stinger.mp3';
    export const SOUND_THEMED = 'sounds/themed.mp3';
    export const PATH_BOUNDING_BOX = 'cart_bounding_box.json';
    export const PATH_FONT_SAMUEL_REGULAR = 'font_samuel_regular.json';
    export const SOUND_CAR_CAR_COLLISION = 'sounds/car_car_collision.mp3';
    export const SOUND_ENGINE_START = 'sounds/carStart.mp3';
    export const SOUND_IDLE_ENGINE = 'sounds/idleEngine.mp3';
    export const SOUND_CAR_ACCELERATION = 'sounds/carAcceleration.mp3';
    export const SOUND_HIT_POTHOLE = 'sounds/pothole.mp3';
    export const SOUND_ACCELERATOR_BONUS_START = 'sounds/acceleratorBonusStart.mp3';
    export const SOUND_ACCELERATOR_BONUS_END = 'sounds/acceleratorBonusEnd.mp3';
    export const SOUND_HIT_WALL = 'sounds/hitWall.mp3';

    export const MUSIC_ENDED_EVENT = 'ended';

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
    export const YELLOW = 0xffff00;
    export const TOTAL_LAPS = 3;

    export const COUNTDOWN_TIME = 6;
    export const COUNTDOWN_TEXT_SIZE = 200;
    export const COUNTDOWN_TEXT_HEIGHT = 0;
    export const COUNTDOWN_TEXT_CURVE_SEGMENTS = 5;
    export const COUNTDOWN_TEXT_BEVEL_ENABLES = true;
    export const COUNTDOWN_TEXT_BEVEL_THICKNESS = 10;
    export const COUNTDOWN_TEXT_BEVEL_SIZE = 1;
    export const COUNTDOWN_TEXT_COLOR = 0xffff00;
    export const COUNTDOWN_NAME = 'countdown';

    export const LIGHT_COLOR = 0xffffff;

    export const DRIVE_MODIFIER_NONE_POSITION = 0;
    export const DRIVE_MODIFIER_NONE_ACCELERATION = 1;
    export const DRIVE_MODIFIER_NONE_DECELERATION = 1;
    export const DRIVE_MODIFIER_NONE_ROTATION = 1;
    export const DRIVE_MODIFIER_NONE_TIME = -1;

    export const DRIVE_MODIFIER_BOOSTER_SPEED_MULTIPLIER = 1.5;
    export const DRIVE_MODIFIER_BOOSTER_POSITION = 0;
    export const DRIVE_MODIFIER_BOOSTER_ACCELERATION = 1;
    export const DRIVE_MODIFIER_BOOSTER_DECELERATION = 0;
    export const DRIVE_MODIFIER_BOOSTER_ROTATION = 1;
    export const DRIVE_MODIFIER_BOOSTER_TIME = 60 * 2;

    export const DRIVE_MODIFIER_POTHOLE_MINIMUM_SPEED = 0.5;
    export const DRIVE_MODIFIER_POTHOLE_DECELERATION = 5;
    export const DRIVE_MODIFIER_POTHOLE_ACCELERATION = -7.5;
    export const DRIVE_MODIFIER_POTHOLE_ROTATION = 1;
    export const DRIVE_MODIFIER_POTHOLE_TIME = 30;

    export const DRIVE_MODIFIER_PUDDLE_MINIMUM_SPEED = 0.5;
    export const DRIVE_MODIFIER_PUDDLE_POSITION = 0;
    export const DRIVE_MODIFIER_PUDDLE_ACCELERATION = -1;
    export const DRIVE_MODIFIER_PUDDLE_DECELERATION = 1;
    export const DRIVE_MODIFIER_PUDDLE_ROTATION = 0;
    export const DRIVE_MODIFIER_PUDDLE_TIME = 45;

    export const FIRST_INTERSECTION = 0;
    export const SECOND_INTERSECTION = 1;
}
