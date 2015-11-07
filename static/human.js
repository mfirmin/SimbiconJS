var human = {
    "joints": {
        "lAnkle": {
            "A": "lShin",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                60
            ],
            "ANGLE_MIN": [
                0,
                0,
                -60
            ],
            "B": "lFoot",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                0.042,
                -0.1
            ],
            "type": "HINGE"
        },
        "lElbow": {
            "A": "lArm",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                0
            ],
            "ANGLE_MIN": [
                0,
                0,
                -157.5
            ],
            "B": "lForearm",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                1.174,
                -0.1
            ],
            "type": "HINGE"
        },
        "lHip": {
            "A": "pelvis",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                45
            ],
            "ANGLE_MIN": [
                0,
                0,
                -135.0
            ],
            "B": "lThigh",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                0.923,
                0.0
            ],
            "type": "HINGE"
        },
        "lKnee": {
            "A": "lThigh",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                157.5
            ],
            "ANGLE_MIN": [
                0,
                0,
                0
            ],
            "B": "lShin",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                0.493,
                -0.1
            ],
            "type": "HINGE"
        },
        "lShoulder": {
            "A": "uTorso",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                90
            ],
            "ANGLE_MIN": [
                0,
                0,
                -179.999
            ],
            "B": "lArm",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                1.475,
                0.0
            ],
            "type": "HINGE"
        },
        "lTorso2uTorso": {
            "A": "lTorso",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                22.5
            ],
            "ANGLE_MIN": [
                0,
                0,
                -22.5
            ],
            "B": "uTorso",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                1.097,
                0
            ],
            "type": "HINGE"
        },
        "lWrist": {
            "A": "lForearm",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                90
            ],
            "ANGLE_MIN": [
                0,
                0,
                -90
            ],
            "B": "lHand",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                -0.004,
                0.924,
                -0.1
            ],
            "type": "HINGE"
        },
        "neck2head": {
            "A": "neck",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                45
            ],
            "ANGLE_MIN": [
                0,
                0,
                -45
            ],
            "B": "head",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                1.588,
                0
            ],
            "type": "HINGE"
        },
        "rAnkle": {
            "A": "rShin",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                60
            ],
            "ANGLE_MIN": [
                0,
                0,
                -60
            ],
            "B": "rFoot",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                0.042,
                0.1
            ],
            "type": "HINGE"
        },
        "rElbow": {
            "A": "rArm",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                0
            ],
            "ANGLE_MIN": [
                0,
                0,
                -157.5
            ],
            "B": "rForearm",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                1.174,
                0.1
            ],
            "type": "HINGE"
        },
        "rHip": {
            "A": "pelvis",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                45
            ],
            "ANGLE_MIN": [
                0,
                0,
                -135.0
            ],
            "B": "rThigh",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                0.923,
                0.0
            ],
            "type": "HINGE"
        },
        "rKnee": {
            "A": "rThigh",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                157.5
            ],
            "ANGLE_MIN": [
                0,
                0,
                0
            ],
            "B": "rShin",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                0.493,
                0.1
            ],
            "type": "HINGE"
        },
        "rShoulder": {
            "A": "uTorso",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                90
            ],
            "ANGLE_MIN": [
                0,
                0,
                -179.999
            ],
            "B": "rArm",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                1.475,
                0.0
            ],
            "type": "HINGE"
        },
        "rWrist": {
            "A": "rForearm",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                90
            ],
            "ANGLE_MIN": [
                0,
                0,
                -90
            ],
            "B": "rHand",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                -0.004,
                0.924,
                0.1
            ],
            "type": "HINGE"
        },
        "uTorso2neck": {
            "A": "uTorso",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                0
            ],
            "ANGLE_MIN": [
                0,
                0,
                0
            ],
            "B": "neck",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                1.559,
                0
            ],
            "type": "HINGE"
        },
        "waist": {
            "A": "pelvis",
            "ANGLE": [
                0,
                0,
                0
            ],
            "ANGLE_MAX": [
                0,
                0,
                22.5
            ],
            "ANGLE_MIN": [
                0,
                0,
                -22.5
            ],
            "B": "lTorso",
            "axis": [
                0,
                0,
                1
            ],
            "position": [
                0,
                0.995,
                0
            ],
            "type": "HINGE"
        }
    },
    "parts": {
        "head": {
            "height": 0.11,
            "mass": 4.5,
            "position": [
                0,
                1.728,
                0
            ],
            "radiusBottom": 0.1,
            "radiusTop": 0.08,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "lArm": {
            "height": 0.303,
            "mass": 2,
            "position": [
                0,
                1.347,
                -0.1
            ],
            "radiusBottom": 0.05,
            "radiusTop": 0.027,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "lFoot": {
            "mass": 1,
            "position": [
                0.065,
                0.025,
                -0.1
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "sides": [
                0.18,
                0.05,
                0.07
            ],
            "type": "BOX"
        },
        "lForearm": {
            "height": 0.232,
            "mass": 1,
            "position": [
                0,
                1.058,
                -0.1
            ],
            "radiusBottom": 0.032,
            "radiusTop": 0.016,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "lHand": {
            "mass": 0.5,
            "position": [
                0,
                0.863,
                -0.1
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "sides": [
                0.044,
                0.16,
                0.1
            ],
            "type": "BOX"
        },
        "lShin": {
            "height": 0.433,
            "mass": 3,
            "position": [
                0,
                0.278,
                -0.1
            ],
            "radiusBottom": 0.045,
            "radiusTop": 0.022,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "lThigh": {
            "height": 0.4,
            "mass": 7,
            "position": [
                0,
                0.719,
                -0.1
            ],
            "radiusBottom": 0.07,
            "radiusTop": 0.03,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "lTorso": {
            "mass": 7.0,
            "position": [
                0,
                1.044,
                0
            ],
            "radius": 0.065,
            "rotation": [
                90,
                0,
                0
            ],
            "type": "SPHERE"
        },
        "neck": {
            "mass": 0.5,
            "position": [
                0,
                1.574,
                0
            ],
            "radius": 0.04,
            "rotation": [
                90,
                0,
                0
            ],
            "type": "SPHERE"
        },
        "pelvis": {
            "mass": 6.5,
            "position": [
                0,
                0.95,
                0
            ],
            "radius": 0.06,
            "rotation": [
                90,
                0,
                0
            ],
            "type": "SPHERE"
        },
        "rArm": {
            "height": 0.303,
            "mass": 2,
            "position": [
                0,
                1.347,
                0.1
            ],
            "radiusBottom": 0.05,
            "radiusTop": 0.027,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "rFoot": {
            "mass": 1,
            "position": [
                0.065,
                0.025,
                0.1
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "sides": [
                0.18,
                0.05,
                0.07
            ],
            "type": "BOX"
        },
        "rForearm": {
            "height": 0.232,
            "mass": 1,
            "position": [
                0,
                1.058,
                0.1
            ],
            "radiusBottom": 0.032,
            "radiusTop": 0.016,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "rHand": {
            "mass": 0.5,
            "position": [
                0,
                0.863,
                0.1
            ],
            "rotation": [
                0,
                0,
                0
            ],
            "sides": [
                0.044,
                0.16,
                0.1
            ],
            "type": "BOX"
        },
        "rShin": {
            "height": 0.433,
            "mass": 3,
            "position": [
                0,
                0.278,
                0.1
            ],
            "radiusBottom": 0.045,
            "radiusTop": 0.022,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "rThigh": {
            "height": 0.4,
            "mass": 7,
            "position": [
                0,
                0.719,
                0.1
            ],
            "radiusBottom": 0.07,
            "radiusTop": 0.03,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        },
        "uTorso": {
            "height": 0.3,
            "mass": 16,
            "position": [
                0,
                1.327,
                0
            ],
            "radiusBottom": 0.1,
            "radiusTop": 0.07,
            "rotation": [
                0,
                0,
                90
            ],
            "type": "CAPSULE"
        }
    }
}
