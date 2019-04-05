package com.motoappdriver;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.imagepicker.ImagePickerPackage;

import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.dylanvann.fastimage.FastImageViewPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };
    return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
    // eg. new VectorIconsPackage()
      new MapsPackage(),
      new VectorIconsPackage(),
      new RNGooglePlacesPackage(),
      new RNCameraPackage(),
      new FastImageViewPackage(),
      new ImagePickerPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}

// public class MainApplication extends Application implements ReactApplication
// {

// private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
// @Override
// public boolean getUseDeveloperSupport() {
// return BuildConfig.DEBUG;
// }

// @Override
// protected List<ReactPackage> getPackages() {
// return Arrays.<ReactPackage>asList(
// new MainReactPackage(),
// );
// }

// @Override
// protected String getJSMainModuleName() {
// return "index";
// }
// };

// @Override
// public ReactNativeHost getReactNativeHost() {
// return mReactNativeHost;
// }

// @Override
// public void onCreate() {
// super.onCreate();
// SoLoader.init(this, /* native exopackage */ false);
// }
// }
