# Troubleshouting

## Error LIBUSB_ERROR_ACCESS

You have a permission error for accessing the printer.

Check permissions on with
```bash
ls -la /dev/usb
```

### Simple solution

Add your user to the group "lp"

```bash
sudo adduser pi lp
```

And logout/login again.

### Complex solution

If the simple one, doesn't work.
You need to add a new udev rule to fix the permissions.

Edit a file in /etc/udev/rules.d/.

For example /etc/udev/rules.d/50-myusb.rules :

```
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0416", ATTRS{idProduct}=="5011", GROUP="users", MODE="0666"
```

You can find vendor and product id by using, these commands :

```bash
# Find usb bus of printer
find /dev/bus/usb/ '!' -type d -mmin -25
# Pass the file to 
udevadm info /path/of/usb/printer

# Or use this command :
lsusb -vvv
```
