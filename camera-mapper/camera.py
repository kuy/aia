# Copyright(c) 2019 Yuki KODAMA / @kuy
# This script is distributed under the MIT License.

import time
import cv2
import atomac

cap = cv2.VideoCapture(0)
ai = atomac.getAppRefByBundleId('com.adobe.illustrator')

while True:
    ret, frame = cap.read()

    frame = cv2.resize(frame, (int(frame.shape[1]/24), int(frame.shape[0]/24)))
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    cv2.imshow('Camera: ' + str(frame.shape[1]) + 'x' + str(frame.shape[0]), frame)

    buf = ''
    for y in range(frame.shape[0]):
        for x in range(frame.shape[1]):
            buf += '%02x' % frame[y, x]

    atomac.Clipboard.copy(buf)

    ai.sendKeyWithModifiers('a', [atomac.AXKeyCodeConstants.COMMAND])
    ai.sendKey(atomac.AXKeyCodeConstants.DELETE)
    ai.sendKeyWithModifiers('v', [atomac.AXKeyCodeConstants.COMMAND])

    k = cv2.waitKey(1)
    if k == 27:
        break

    time.sleep(0.85)

cap.release()
cv2.destroyAllWindows()