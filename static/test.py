
def diffrence(stime, ftime):
    """Returns diffrence between two times in d/h/m/s"""
    min_, sec_ = divmod(ftime - stime, 60)
    hour_, min_ = divmod(min_, 60)
    day_, hour_ = divmod(hour_, 24)
    uptime = ""
    if day_ > 0:
        uptime += f"{str(round(day_))} {(day_ == 1 and 'day' or 'days')}, "
    if uptime or hour_ > 0:
        uptime += f"{str(round(hour_))} {(hour_ == 1 and 'hour' or 'hours')}, "
    if uptime or min_ > 0:
        uptime += f"{str(round(min_))} {(min_ == 1 and 'minute' or 'minutes')}, "
    uptime += f"{str(round(sec_))} {(sec_ == 1 and 'second' or 'seconds')}."
    return uptime

import time
start = 1497549267 #Thursday, 15 June 2017 17:54:27
finish = time.time()
print(diffrence(start, finish))